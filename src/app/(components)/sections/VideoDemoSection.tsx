export default function VideoDemoSection() {
    return (
        <section className="bg-white">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-center mb-8">Preview Our App Below!</h1>
                <div className="w-full p-3 bg-gray-200 max-w-3xl mx-auto flex justify-center items-center rounded-lg shadow-md">
                    <video preload="metadata" autoPlay muted loop>
                        <source src="/videos/demo.mov" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </section>
    );
}
