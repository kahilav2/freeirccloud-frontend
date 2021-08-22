import userAPIRepository from '~/api-repositories/user';
import serverAPIRepository from '~/api-repositories/server';
import adminAPIRepository from '~/api-repositories/admin';

export default (ctx, inject) => {
  inject('userAPI', userAPIRepository(ctx.$axios, ctx.app.store));
  inject('serverAPI', serverAPIRepository(ctx.$axios, ctx.app.store));
  inject('adminAPI', adminAPIRepository(ctx.$axios, ctx.app.store));
};
