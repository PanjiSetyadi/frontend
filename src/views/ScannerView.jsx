import React, { useState, useEffect, useRef } from 'react';
import { getProductDetails } from '../presenter/scannerPresenter';
import Quagga from 'quagga';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';

const ScannerView = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [productDetails, setProductDetails] = useState("");
  const [warning, setWarning] = useState('');
  const [checks, setChecks] = useState({ sugar: false, fat: false, carbs: false });
  const [hasScanned, setHasScanned] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const quaggaStartedRef = useRef(false);

  const checksRef = useRef(checks);
  
  useEffect(() => {
    checksRef.current = checks;
  }, [checks]);

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setChecks((prev) => {
      const updated = { ...prev, [name]: checked };
      checksRef.current = updated; // ← update ref juga
      return updated;
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setHasScanned(false); 

    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = reader.result;
      setPreviewImage(imageDataUrl);

      const img = new Image();
      img.src = imageDataUrl;

      img.onload = () => {
        Quagga.decodeSingle(
          {
            src: imageDataUrl,
            numOfWorkers: 0,
            inputStream: { size: 800 },
            decoder: {
              readers: ['ean_reader', 'ean_8_reader', 'code_128_reader'],
            },
          },
          (result) => {
            if (result?.codeResult?.code) {
              const scannedBarcode = result.codeResult.code;
              getProductDetails(scannedBarcode, setProductDetails, setWarning, checksRef.current);
            } else {
              alert('Barcode tidak ditemukan dalam gambar.');
            }
          }
        );
      };
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    const startScanner = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });

        if (!videoRef.current) return;

        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', true);

        try {
          await videoRef.current.play();
        } catch (err) {
          if (err.name !== 'AbortError') {
            console.error('Error playing video stream:', err);
          }
        }
        streamRef.current = stream;

        Quagga.init({
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: videoRef.current,
          constraints: { facingMode: 'environment' }
        },
        locator: {
          patchSize: 'medium',
          halfSample: true
        },
        numOfWorkers: navigator.hardwareConcurrency || 4,
        decoder: {
          readers: ['ean_reader', 'ean_8_reader', 'code_128_reader']
        },
        locate: true, // penting agar Quagga cari barcode secara aktif
        debug: true
      }, (err) => {
        if (err) {
          console.error('Quagga init error:', err);
          return;
        }
        Quagga.start();
        quaggaStartedRef.current = true;
      });


        Quagga.onDetected((data) => {
          if (hasScanned) return;

          const detectedCode = data.codeResult.code;
          setHasScanned(true);
          getProductDetails(detectedCode, setProductDetails, setWarning, checksRef.current);
        });

      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    startScanner();

    return () => {
      if (quaggaStartedRef.current) {
        Quagga.stop();
        quaggaStartedRef.current = false;
      }

      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#A6E3E9] mt-14 py-6 px-4 flex flex-col items-center">
        <h1 className="text-2xl font-extrabold text-[#2F4F4F] mb-6">NUTRIVISION</h1>
        <p className="text-sm font-semibold text-gray-700 mb-4 text-center">Scan Your Nutrition Here!</p>

        <div className="bg-[#71C9CD] border-5 border-white p-4 rounded-xl w-full max-w-4xl mb-6">
          <p className="text-center font-semibold text-2xl mb-5">Choose Your Goals</p>
          <div className="flex justify-around">
            {['sugar', 'fat', 'carbs'].map((item) => (
              <label key={item} className="flex flex-col items-center text-sm font-semibold text-[#333]">
                {item === 'sugar' && 'Gula/Gukosa'}
                {item === 'fat' && 'Kolesterol'}
                {item === 'carbs' && 'Karbohidrat'}
                <input
                  type="checkbox"
                  name={item}
                  checked={checks[item]}
                  onChange={handleCheckbox}
                  className="mt-1"
                />
              </label>
            ))}
          </div>
        </div>

        <video
          ref={videoRef}
          className="bg-black w-full max-w-4xl h-80 sm:h-[400px] mb-4 rounded-xl border-4 border-white"
          muted
          autoPlay
        ></video>

        <div className="flex flex-col items-center gap-4 mb-6">
          <label className="cursor-pointer text-white bg-[#3A7D44] hover:bg-[#2F4F4F] px-6 py-2 rounded-2xl text-sm font-bold">
            Upload From Your Gallery
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {previewImage && (
          <div className="mb-4 text-center">
            <p className="text-sm text-gray-600 mb-2">Preview Gambar:</p>
            <img src={previewImage} alt="Preview" className="w-48 sm:w-64 mx-auto rounded-lg shadow" />
          </div>
        )}

        <div className="w-full max-w-4xl">
          <div className="text-left mb-4">
            <h2 className="font-bold text-sm mb-1">Detail Produk</h2>
            <div className="w-full h-[320px] p-4 mt-1 bg-red-50 rounded-md text-sm overflow-auto whitespace-pre-wrap font-mono">
              {productDetails}
            </div>
          </div>

          <div className="text-left">
            <h2 className="font-bold text-sm mb-1">Result</h2>
            <div className="w-full h-[160px] p-4 mt-1 bg-white rounded-md text-sm overflow-auto whitespace-pre-wrap font-medium text-gray-900">
              {warning}
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default ScannerView;
