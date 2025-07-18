const Container = ({ children }) => {
    return (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
        </main>
    );
};

export default Container;