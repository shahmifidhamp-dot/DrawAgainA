import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Image as ImageIcon, Upload, Trash2 } from 'lucide-react';

export default function Gallery() {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('drawagain_gallery');
        if (saved) {
            try {
                setImages(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load images", e);
            }
        }
    }, []);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const newImages = [reader.result, ...images];
            setImages(newImages);
            localStorage.setItem('drawagain_gallery', JSON.stringify(newImages));
        };
        reader.readAsDataURL(file);
    };

    const handleDelete = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        localStorage.setItem('drawagain_gallery', JSON.stringify(newImages));
    };

    return (
        <div className="flex flex-col items-center animate-in fade-in duration-500 w-full">
            <Card className="w-full space-y-8">
                {/* Header */}
                <div className="space-y-2 text-center relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate('/planner')}
                        className="absolute left-0 top-0 -ml-2 -mt-1 text-slate-400 hover:text-slate-600"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <h2 className="text-2xl font-bold text-slate-800">Your Gallery</h2>
                    <p className="text-slate-500">A collection of your moments.</p>
                </div>

                {/* Upload Section */}
                <div className="relative group">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-slate-400 group-hover:border-lavender-300 group-hover:bg-lavender-50/50 transition-all duration-300">
                        <Upload className="w-8 h-8 mb-2 opacity-50 group-hover:text-lavender-500 group-hover:opacity-100 transition-all" />
                        <span className="text-sm font-medium group-hover:text-lavender-600">Upload a drawing</span>
                    </div>
                </div>

                {/* Image Grid */}
                {images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative group rounded-xl overflow-hidden aspect-square border border-slate-100 bg-slate-50">
                                <img src={img} alt={`Drawing ${idx}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        onClick={() => handleDelete(idx)}
                                        className="text-white bg-white/20 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center space-y-3 opacity-50">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                            <ImageIcon className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-sm text-slate-400">No drawings shared yet.</p>
                    </div>
                )}
            </Card>
        </div>
    );
}
