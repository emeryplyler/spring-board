import Link from "next/link";

export default function TestPage() {
    return (
        <div className="m-4">
            <h1 className="text-2xl mb-4">Test Page</h1>
            <p className="text-gray-500 font-light mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit ea expedita nostrum officia tenetur nisi perspiciatis excepturi aut, nemo quam repellat tempora vel quibusdam porro recusandae asperiores sapiente quos ex.</p>
            <h2 className="text-xl mb-2">List</h2>
            <ul className="mb-4">
                <li className="font-light">Test Item 1</li>
                <li className="font-light">Test Item 2</li>
                <li className="font-light">Test Item 3</li>
            </ul>
            <div className="flex gap-4 mb-4">
                <button className="bg-amber-300 p-2 rounded-lg"> Button 1 </button>
                <button className="bg-blue-300 p-2 rounded-lg"> Button 2 </button>
                <button className="bg-green-300 p-2 rounded-lg"> Button 3 </button>
            </div>
            <Link href="/" className="text-blue-700 hover:text-blue-300"> Home </Link>
        </div>
    );
}
