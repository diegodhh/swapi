const actions = {
    fetch_data: 'fetch-data', 
    fetch_more: 'fetch-more', // for pagination
    search_item: 'search-item', // event change of searchfield
    select_item_inside_detail: 'select_item_inside_detail',
    select_item: 'select-item',
    select_item_by_index: 'select-item-by-index',
    populate_item: 'populate-item',
    scroll_bottom: 'scroll-bottom',
    select_resource: 'select-resource',
    populate_resource: 'populate-resource',
    change_screen_and_search:'change-screen-and-search',
    show_spin: 'show-spin',
    conection_error: 'conection_error',
    global_signature: "GLOBAL"
}

export default actions;