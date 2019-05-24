import menus from '@/router/routers.js'
import LazyLoading from '@/global/lazyLoading'
export default (routers, permission) => {
  generaMenu(routers, menus, permission)
}
function generaMenu (routers, menus, permission) {
  menus.forEach((item) => {
    let menu = Object.assign({}, item)
    if ((menu.meta.permission === 'root' || permission.indexOf(menu.meta.permission) >= 0) && menu.children && menu.children.length > 0) {
      menu.children = []
      generaMenu(menu.children, item.children, permission)
    }
    if (menu.meta.permission === 'root' || permission.indexOf(menu.meta.permission) >= 0) {
      routers.push(menu)
    } else {
      menu.component = LazyLoading('page/noAuth')
      menu.meta.show = false
      routers.push(menu)
    }
  })
}
