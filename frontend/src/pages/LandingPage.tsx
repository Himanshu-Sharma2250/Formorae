import PricingTable from "../components/PricingTable";

const LandingPage = () => {
  return (
    <div>
        {/* main area that is shown to user when user visits */}
        <main className="h-[90vh] w-[100vw] border-2 flex flex-col justify-center items-center">
            <h1 className="text-7xl font-mono font-bold">
                Formorae
            </h1>

            <p className="text-2xl font-mono font-light">
                Create form easily for your personal work or for organisation work
            </p>

            <button className="font-mono  px-4 py-2 bg-blue-500 rounded-xl mt-10 cursor-pointer hover:bg-blue-700">Get Started</button>
        </main>

        <PricingTable/>
    </div>
  )
}

export default LandingPage;