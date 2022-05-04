import { ApolloError } from 'apollo-server-errors';
import { withFilter } from 'apollo-server-express';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { extendType, inputObjectType, list, nonNull, objectType, stringArg } from 'nexus';
import { Characters, Users } from 'nexus-prisma';

export const user = objectType({
  name: Users.$name,
  description: Users.$description,
  definition(t) {
    t.field(Users.Id);
    t.field(Users.Email)
  },
});
export const char = objectType({
  name: Characters.$name,
  definition(t) {
    t.field(Characters.OwnerId),
    t.field(Characters.Users)
  }
})

export const login = objectType({
  name: 'Login',
  definition(t) {
    t.id('id');
  },
});

export const UserUpdateInputArgs = inputObjectType({
  name: 'UserDetailsUpdateArgs',
  definition: (t) => {
    t.string('firstName');
    t.string('lastName');
    t.id('id');
  },
});



export const UserQueries = extendType({
  type: 'Query',
  definition: (t) => {
   
  },
});

export const UserMutations = extendType({
  type: 'Mutation',
  definition(t) {
    // t.field('userCreate', {
    //   type: nonNull('Login'),
    //   args: {
    //     username: nonNull(stringArg()),
    //     password: nonNull(stringArg()),
    //   },
    //   resolve: async (source, { username, password }, ctx, {}) => {
    //     const anyUser = await ctx.db.user.findFirst({ where: { username } });

    //     if (anyUser) {
    //       throw new ApolloError('Username already in use');
    //     }

    //     const user = await ctx.db.users.create({
    //       data: {
    //         password: await hash(password, 12),
    //         username,
    //         money: 3000,
    //       },
    //     });

    //     return {
    //       token: await sign({ userId: user.id }, process.env.SECRET!, { expiresIn: '60m' }),
    //       username: user.username,
    //       id: user.id,
    //     };
    //   },
    // });
    t.field('userLogin', {
      type: nonNull('Login'),
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (source, { username, password }, ctx) => {
        return {
          id: "yeah boi"
        };
      },
    })
  }
})



