
export function manageSelections (state, selection) {
    state.selections = {... state.selections, ...selection}
}
