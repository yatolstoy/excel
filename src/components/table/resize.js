import {$} from '@core/dom'

export function startResize(event) {
  const $resizer = $(event.target)
  if (!$resizer.data.resize) return
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = $resizer.data.resize == 'col' ? 'width' : 'height'
  const sideProp = type === 'width' ? 'bottom' : 'right'
  let value = ''
  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px',
  })

  document.onmousemove = e => {
    const delta = (type === 'width')
                            ? e.pageX - coords.right
                            : e.pageY - coords.bottom
    value = coords[type] + delta + 'px'
    $resizer.css({
      [type === 'width' ? 'right' : 'bottom']: -delta + 'px',
    })
  }

  document.onmouseup = e => {
    document.onmousemove = null
    $resizer.css({
      opacity: '',
      bottom: '',
      right: '',
    })
    $parent.css({[type]: value})
    if (type === 'width') {
      this.$root
          .findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => $(el).css({[type]: value}))
    }
    document.onmouseup = null
  }
}
