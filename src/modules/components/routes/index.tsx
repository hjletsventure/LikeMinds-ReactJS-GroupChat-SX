import { Route, Routes } from 'react-router-dom';
import Switch from '../switch';
import routeVariable from '../../../enums/routeVariables';

const RouteProvider: React.FC = () => (
  <Switch />
  // <Routes>
  //   <Route path="community/" element={<Switch />} />
  //   <Route path={`community/:${routeVariable.mode}`} element={<Switch />} />
  //   <Route path={`community/:${routeVariable.mode}/:${routeVariable.operation}`} element={<Switch />} />
  //   <Route
  //     path={`community/:${routeVariable.mode}/:${routeVariable.operation}/:${routeVariable.id}`}
  //     element={<Switch />}
  //   />
  //   <Route
  //     path={`community/:${routeVariable.mode}/:${routeVariable.operation}/:${routeVariable.id}/:${routeVariable.replyPrivatelyVariable}`}
  //     element={<Switch />}
  //   />
  // </Routes>
);

export default RouteProvider;

// mode for selecting options between "groupchat" and "direct messaging"
// operation is the corresponding subpath example for viewing group info will will route to /info
// id will correspond to the chatroom id

// definition of routes are available in route.js file inside likeminds folder
