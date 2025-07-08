'use client'

import NoSSRWrapper from "./NoSSRwrapper";
import Home from "./Home";

export default function Page() {
  return <NoSSRWrapper><Home /></NoSSRWrapper>
}