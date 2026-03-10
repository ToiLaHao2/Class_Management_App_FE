import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Class Management App</h1>
            <p className="text-gray-600 mb-6 font-medium">Lego / FSD Architecture Ready! 🚀</p>
            <div className="flex gap-2 justify-center">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Vite</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">React TS</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Tailwind CSS</span>
            </div>
        </div>
    </div>
);

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                {/*
          Ví dụ cấu trúc Lego sau này:
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/classes/*" element={<ClassRoutes />} />
        */}
            </Routes>
        </BrowserRouter>
    );
};
