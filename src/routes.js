import React from 'react';
import { mount, route, withView } from 'navi';
import { View } from 'react-navi';

import Categories from './containers/Categories';
import Devices from './containers/Devices';
import Layout from './containers/Layout/Layout';

export const routes = withView(
  <Layout>
    <View />
  </Layout>,
  mount({
    '/categories': route({
      title: 'Categories',
      view: <Categories />,
    }),
    '/devices': route({
      title: 'Devices',
      view: <Devices />,
    }),
  }),
);
