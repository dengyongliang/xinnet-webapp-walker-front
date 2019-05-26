import LazyLoading from '@/global/lazyLoading'
export default (routers, data) => {
  generaMenu(routers, data)
}
function generaMenu (routers, data) {
  data.forEach((item) => {
    let menu = Object.assign({}, item)
    menu.component = LazyLoading(menu.meta.compUrl)
    if (menu.children && menu.children.length > 0) {
      menu.children = []
      generaMenu(menu.children, item.children)
    }
    routers.push(menu)
  })
}
