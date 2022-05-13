import React, { FC, /*useState*/ } from 'react'
import { FormattedMessage } from 'react-intl'           // to consume the translations provided by the messages builder
import { Alert, Card, Layout, PageBlock, PageHeader, Spinner } from 'vtex.styleguide'     // UI components we provide you out of the box; https://styleguide.vtex.com/#/Introduction/Developing

//  Only to show how the flow with GraphQL looks like:
import { useQuery } from 'react-apollo'
import HELLO from './graphql/helloWorld.graphql'

import './styles.global.css'

const HWAdmin: FC = () => {

  const { data, loading, error } = useQuery(HELLO)
  console.log(data)
  const payloads: string[] = [data?.helloWorld] ?? ['Empty :('];

  if (error){
    return (
      <Alert type="error" onClose={() => console.log('Error alert closed')}>{error}</Alert>
    );
    }

  if (loading && !data){
    return (
      <Spinner/>
    );}


  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="admin-tobak.hello-world" />}
        />
      }
    >
      <PageBlock title="2bak Integration App" subtitle="{{settings.username}}" variation="full">
        { payloads.map((payload) => <Card>{payload}</Card>) }     
      </PageBlock>
    </Layout>
  )
}

export default HWAdmin
