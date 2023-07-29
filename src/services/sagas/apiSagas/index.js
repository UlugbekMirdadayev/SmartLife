import User from '../../api/User/sagas';

export default function sagas(api) {
  return [User(api)];
}
