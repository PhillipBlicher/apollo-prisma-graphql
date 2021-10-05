import { datatype, lorem, random } from 'faker';
import { extendType, inputObjectType, list, nonNull, objectType, stringArg } from 'nexus';
import { Item, PartName, SaberPart } from "nexus-prisma";

export const item = objectType({
  name: Item.$name,
  definition(t) {
    t.field(Item.id);
    t.field(Item.SaberPart); //filtering
    t.field(Item.PartName);
    t.field(Item.partDescription);
    t.field(Item.price);
    t.field(Item.userId);
    t.field(Item.User)
    t.field(Item.carts)
  },
});

export const saberPart = objectType({
  name: SaberPart.$name,
  definition(t) {
    t.field(SaberPart.id);
    t.field(SaberPart.name);
  },
});

export const partName = objectType({
  name: PartName.$name,
  definition(t) {
    t.field(PartName.id);
    t.field(PartName.name);
  },
});

export const ItemArgs = inputObjectType({
  name: 'ItemArgs',
  definition: (t) => {
    t.string('partDescription');
    t.string('partName');
    t.string('saberPart');
  },
});

export const ItemQueries = extendType({
  type: 'Query',
  definition(t) {
    t.field("items", {
      type: nonNull(list(nonNull('Item'))),
      resolve: (source, args, ctx) => {
        return ctx.db.item.findMany();
      },
    });
    t.field("displayItems", {
      type: nonNull(list(nonNull('Item'))),
      args: { username: nonNull(stringArg()) },
      resolve: async (source, { username }, ctx) => {
        return await ctx.db.item.findMany({ where: { User: { username } } });
      },
    });
    t.field("filterItems", {
      type: nonNull(list(nonNull('Item'))),
      args: { saberPart: nonNull(stringArg()) },
      resolve: async (source, { saberPart }, ctx) => {
        if (saberPart == "") {
          return await ctx.db.item.findMany({ where: { User: { username: "dark_saber_dealer_69" } } })
        }
        return await ctx.db.item.findMany({ where: { SaberPart: { name: saberPart }, User: { username: "dark_saber_dealer_69" } } })
      }
    })
  },
});

export const ItemMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('itemCreate', {
      type: 'Item',
      resolve: async (source, args, ctx) => {

        const saberParts = await ctx.db.saberPart.findMany();
        const saberPart = random.arrayElement(saberParts);

        const partNames = await ctx.db.partName.findMany({ where: { saberPartId: saberPart.id } });
        const watto = await ctx.db.user.findFirst({ where: { username: "dark_saber_dealer_69"} })

        return await ctx.db.item.create({
          data: {
            saberPartId: saberPart.id,
            partNameId: random.arrayElement(partNames).id,
            partDescription: lorem.paragraph(),
            price: datatype.number(300),
            userId: watto?.id
          }
        });
      }
    }),
    t.field('itemBuy', {
      type: 'Item',
      args: {
        userBuyerId: nonNull(stringArg()),
        itemId: nonNull(stringArg())
      },
      resolve: async (source, args, ctx) => {
        const watto = await ctx.db.user.findFirst({ where: { username: "dark_saber_dealer_69" } })
        let buyer = await ctx.db.user.findFirst({ where: { id: args.userBuyerId } })
        const item = await ctx.db.item.findFirst({
          where: {
            id: args.itemId,
            userId: watto?.id
          }
        })

        if (item === null) {
          throw new Error("Watto doesn't own this item")
        }
          
        if (buyer?.money! - item?.price! < 0) {
          throw new Error("Not enough money")
        }

        const result = await ctx.db.$transaction(async () => {
          await ctx.db.user.update({
            where: { id: args.userBuyerId },
            data: {
              money: { decrement: item?.price! }
            }
          })

          await ctx.db.user.update({
            where: { username: "dark_saber_dealer_69" },
            data: {
              money: { increment: item?.price! }
            }
          })

          return await ctx.db.item.update({
            where: { id: args.itemId },
            data: {
              User: {
                connect: { id: args.userBuyerId }
              }
            }
          })
        })

        return result ?? null
      }
    }),
    t.field('itemSell', {
      type: 'Item',
      args: {
        userSellerId: nonNull(stringArg()),
        itemId: nonNull(stringArg())
      },
      resolve: async (source, args, ctx) => {
        let watto = await ctx.db.user.findFirst({ where: { username: "dark_saber_dealer_69" } })
        const seller = await ctx.db.user.findFirst({ where: { id: args.userSellerId } })
        const item = await ctx.db.item.findFirst({
          where: {
            id: args.itemId,
            userId: seller?.id
          }
        })

        if (item === null) {
          throw new Error("User doesn't own this item")
        }

        if (watto?.money! - item?.price! < 0) {
          throw new Error("Watto doesn't enough money")
        }

        const result = await ctx.db.$transaction(async () => {
          await ctx.db.user.update({
            where: { username: "dark_saber_dealer_69" },
            data: {
              money: { decrement: item?.price! }
            }
          })

          await ctx.db.user.update({
            where: { id: args.userSellerId },
            data: {
              money: { increment: item?.price! }
            }
          })

          return await ctx.db.item.update({
            where: { id: args.itemId },
            data: {
              User: {
                connect: { id: watto?.id }
              }
            }
          })
        })

        return result ?? null
      }
    }),
    t.field('itemUpdatePrice', {
      type: nonNull(list(nonNull('Item'))),
      resolve: async (source, args, ctx) => {
        const items = await ctx.db.item.findMany();

        items.map(async item => {
          const change = Math.round(datatype.float({ min: 0.85, max: 1.19 }) * item.price!);

          await ctx.db.item.update({
            where: { id: item.id }, 
            data: { price: change }
          })
        })

        return await ctx.db.item.findMany();
      }
    }),
    t.field('addToCart', {
      type: nonNull('Item'),
      args: {
        userId: nonNull(stringArg()),
        itemId: nonNull(stringArg())
      },
      resolve: async (source, args, ctx) => {

        return await ctx.db.user.update({
          where: { id: args.userId },
          data: {
            cart: {
              connect: {
                id: args.itemId
              }
            }
          }
        })
      }
    }),
    t.field('removeFromCart', {
      type: nonNull('Item'),
      args: {
        userId: nonNull(stringArg()),
        itemId: nonNull(stringArg())
      },
      resolve: async (source, args, ctx) => {
      
        return await ctx.db.user.update({
          where: { id: args.userId },
          data: {
            cart: {
              disconnect: {
                id: args.itemId
              }
            }
          }
        })
      }
    }),
    t.field('buyCart', {
      type: nonNull(list(nonNull('Item'))),
      args: {
        userId: nonNull(stringArg())
      },
      resolve: async (source, {userId}, ctx) => {
        let watto = await ctx.db.user.findFirst({ where: { username: "dark_saber_dealer_69" } })
        const buyer = await ctx.db.user.findFirst({ 
          where: { id: userId }, 
          include: { cart: { include: { PartName: true } } } 
        })

        const totalPrice = getPriceAndCheckOwner(buyer!, watto!.id)
          
        if (buyer?.money! - totalPrice < 0) {
          throw new Error("Not enough money")
        }

        const result = await ctx.db.$transaction(async () => {
          await ctx.db.user.update({
            where: { username: "dark_saber_dealer_69" },
            data: {
              money: { increment: totalPrice }
            }
          })

          await ctx.db.user.update({
            where: { id: userId },
            data: {
              money: { decrement: totalPrice }
            }
          })

          buyer?.cart.forEach(async item => {
            await ctx.db.item.update({
              where: { id: item.id },
              data: {
                User: {
                  connect: { id: userId }
                },
                carts: {
                  disconnect: { id: userId }
                }
              }
            })
          })

          return await ctx.db.item.findMany({ where: {id: userId}})
        })

        return result ?? null
      }
    })
  },
});

function getPriceAndCheckOwner(buyer: import(".prisma/client").User & { cart: (import(".prisma/client").Item & { PartName: import(".prisma/client").PartName | null; })[]; }, wattoId: string) {
  let price = 0
  let unownedItems: string[] = []

  buyer.cart.forEach(item => {
    price += item.price!

    if (item.userId != wattoId) {
      unownedItems.push(item.PartName?.name!)
    }
  });

  if (unownedItems.length !== 0)
    throw new Error("Watto doesn't own these items" + unownedItems)

  return price
}