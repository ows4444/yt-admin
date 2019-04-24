/* eslint-disable no-console */
export default async ctx => {
    await ctx.store.dispatch('nuxtClientInit', ctx).catch(e => console.log(e))
}
