import React from 'react'

// Here you'll define the component props' types:
interface ToBakProps {
  something: string
}

const HWStore: StorefrontFunctionComponent<ToBakProps> = ({something}) => {

  return (
    <div>
        <h1>Hello World, 2Bakers! {something}</h1>
    </div>
    )
}


// This schema refers to the content displayed in the Site Editor: https://learn.vtex.com/docs/course-content-workflow-step04site-editor-lang-en
HWStore.schema = {
  title: 'editor.tobak.title',
  description: 'editor.tobak.description',
  type: 'object',
  properties: {
    something: {
      title: 'Somenthing',
      description: 'Anything',
      type: 'string',
      default: null
    }
  },
}

export default HWStore
