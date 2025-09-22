import React from "react";

async function SearchPage(props: { searchParams: { query: string } }) {
const result=await({await searchParams}.query)
  return <div>SearchPage</div>;
}

export default SearchPage;
