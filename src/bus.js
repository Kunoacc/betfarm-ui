import mitt from 'mitt'

const Events = {
    DRAWER_OPEN: 'drawer:open',
    DRAWER_CLOSE: 'drawer:close',
    DRAWER_TOGGLE: 'drawer:toggle',
    BOOKED_EVENTS_COUNT_UPDATE: 'booked_events:count:update'
}

const emitter = mitt()

export { emitter, Events }