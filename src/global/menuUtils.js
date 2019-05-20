import menus from '@/router/routers.js'
export default (routers, permission) => {
  generaMenu(routers, menus[0].children, permission)
}
function generaMenu (routers, menus, permission) {
  menus.forEach((item) => {
    let menu = Object.assign({}, item)
    if (permission.indexOf(menu.meta.permission) >= 0 && menu.children && menu.children.length > 0) {
      menu.children = []
      generaMenu(menu.children, item.children, permission)
    }
    if (permission.indexOf(menu.meta.permission) >= 0) {
      routers.push(menu)
    }
  })
}
