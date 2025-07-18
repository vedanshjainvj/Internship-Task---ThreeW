// -------------------- PACKAGE IMPORT FILES -------------------- //
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-slate-800 shadow-md">
            <div className="max-w-7xl flex justify-evenly mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <Link to="/" className="text-2xl font-bold text-center text-white tracking-wider">
                    🏆 Leaderboard Task
                </Link>
                <Link to="/leaderboard" className="text-slate-800 px-3 flex items-center bg-amber-50 rounded-2xl  hover:bg-slate-500">
                    View Leaderboard
                </Link>
            </div>
        </header>
    );
};

export default Header;