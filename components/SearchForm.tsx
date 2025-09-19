import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form
      action={"/"}
      scroll={false}
      className="bg-white flex items-center rounded-full px-6 border-4 mt-8 border-black w-full max-w-238 search-form"
    >
      <input
        type="text"
        name="query"
        defaultValue={query}
        placeholder="Search Startups"
        className="focus:outline-0 text-2xl w-full placeholder:text-black font-bold py-4"
      />
      <div className="flex gap-1.5 justify-center items-center">
        {query && <SearchFormReset />}

        <button
          type="submit"
          className="flex justify-center items-center size-12 rounded-full bg-black text-white"
        >
          <Search />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
