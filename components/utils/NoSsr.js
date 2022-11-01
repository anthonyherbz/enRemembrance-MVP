//forces clientside rendering of the wrapped component to prevent hydration error
//need to study exactly how it works, but it does!!
//used for components which need to get the current time-- next and react do not handle this well by default
//from https://stackoverflow.com/a/57173209 @ Erik Hofer

import dynamic from 'next/dynamic'
import React from 'react'

const NoSsr = props => (
  <React.Fragment>{props.children}</React.Fragment>
)

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false
})