import dynamic from 'next/dynamic'
import React from 'react' 
const NoSSRWrapper = (props: { children: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined }) => ( 
    <React.Fragment>{props.children}</React.Fragment> 
) 
export default dynamic(() => Promise.resolve(NoSSRWrapper), { 
    ssr: false 
})