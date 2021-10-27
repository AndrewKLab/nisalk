import { store } from '../_helpers';

export const configApi = {
  apiUrl: store.getState().authentication.source
}