import { GraphQLObjectType, GraphQLList, GraphQLID } from 'graphql';

import { WidgetData } from '../widget-data';
import { widgetType } from './widget-type';

export const query = new GraphQLObjectType({

  name: 'Query',
  description: 'Query endpoint for my GraphQL server',

  fields: () => ({
    widgets: {
      type: new GraphQLList(widgetType),
      description: 'A list of widgets',
      resolve: (_1, _2, { baseUrl }) => {
        const widgetData = new WidgetData(baseUrl);
        return widgetData.all();
      },
    },
    widget: {
      type: widgetType,
      description: 'A single widgets',
      args: {
        widgetId: {
          type: GraphQLID,
          description: 'The id of the widget to load',
        }
      },
      resolve: (_, { widgetId }, { baseUrl }) => {
        const widgetData = new WidgetData(baseUrl);
        return widgetData.one(widgetId);
      },
    }
  }),
});