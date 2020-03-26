const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  ownerName: state => state.user.ownerName,
  businessCode: state => state.user.businessCode,
  uniqueCode: state => state.user.uniqueCode
}
export default getters
