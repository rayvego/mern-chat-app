import {MdOutlinePersonSearch} from "react-icons/md";

export const SearchInput = () => {
    return (

        <form action="" className={"flex items-center gap-2"}>
            <input type="text" placeholder={"Search..."} className={"input input-bordered rounded-full"}/>
            <button type={"submit"} className={"btn btn-circle bg-green-300 text-white border-0"}>
                <MdOutlinePersonSearch className={"w-6 h-6 outline-none"}/>
            </button>
        </form>
    )
}

export default SearchInput