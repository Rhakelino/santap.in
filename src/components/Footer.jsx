export default function Footer() {
    return (
        <footer className="bg-[#0a0a0a] text-gray-500 py-10 px-6 font-outfit border-t border-gray-900">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <h3 className="text-2xl font-bold text-white uppercase tracking-tight">Santap.in.</h3>
                    <p className="text-sm">© 2024 Santap.in. All rights reserved.</p>
                </div>

                <div className="flex gap-6 uppercase text-sm font-medium">
                    <a href="#" className="hover:text-white transition-colors">Instagram</a>
                    <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    <a href="#" className="hover:text-white transition-colors">Facebook</a>
                </div>
            </div>
        </footer>
    )
}
