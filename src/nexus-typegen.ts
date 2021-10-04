/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { ContextType } from "./types/context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  BuyItemArgs: { // input type
    itemId: string; // ID!
    userId: string; // ID!
  }
  ItemArgs: { // input type
    partDescription?: string | null; // String
    partName?: string | null; // String
    saberPart?: string | null; // String
  }
  UserAuthInput: { // input type
    username: string; // String!
  }
  UserDetailsUpdateArgs: { // input type
    firstName?: string | null; // String
    id?: string | null; // ID
    lastName?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Item: { // root type
    id: string; // ID!
    partDescription?: string | null; // String
    price?: number | null; // Int
    userId?: string | null; // String
  }
  Mutation: {};
  PartName: { // root type
    id: string; // ID!
    name: string; // String!
  }
  Query: {};
  SaberPart: { // root type
    id: string; // ID!
    name: string; // String!
  }
  User: { // root type
    id: string; // ID!
    money: number; // Int!
    username: string; // String!
  }
  UserDetails: { // root type
    firstName?: string | null; // String
    id: string; // ID!
    lastName?: string | null; // String
    userId: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Item: { // field return type
    PartName: NexusGenRootTypes['PartName'] | null; // PartName
    SaberPart: NexusGenRootTypes['SaberPart'] | null; // SaberPart
    User: NexusGenRootTypes['User'] | null; // User
    carts: NexusGenRootTypes['User'][]; // [User!]!
    id: string; // ID!
    partDescription: string | null; // String
    price: number | null; // Int
    userId: string | null; // String
  }
  Mutation: { // field return type
    _deprecated_field: string | null; // String
    addToCart: NexusGenRootTypes['Item']; // Item!
    buyCart: NexusGenRootTypes['Item'][]; // [Item!]!
    itemBuy: NexusGenRootTypes['Item'] | null; // Item
    itemCreate: NexusGenRootTypes['Item'] | null; // Item
    itemSell: NexusGenRootTypes['Item'] | null; // Item
    itemUpdatePrice: NexusGenRootTypes['Item'][]; // [Item!]!
    removeFromCart: NexusGenRootTypes['Item']; // Item!
    userCreate: NexusGenRootTypes['User'] | null; // User
    userLogin: NexusGenRootTypes['User'] | null; // User
  }
  PartName: { // field return type
    id: string; // ID!
    name: string; // String!
  }
  Query: { // field return type
    _deprecated_field: string | null; // String
    displayItems: NexusGenRootTypes['Item'][]; // [Item!]!
    filterItems: NexusGenRootTypes['Item'][]; // [Item!]!
    items: NexusGenRootTypes['Item'][]; // [Item!]!
    myq: string | null; // String
    userDetails: NexusGenRootTypes['User'] | null; // User
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  SaberPart: { // field return type
    id: string; // ID!
    name: string; // String!
  }
  User: { // field return type
    cart: NexusGenRootTypes['Item'][]; // [Item!]!
    id: string; // ID!
    inventory: NexusGenRootTypes['Item'][]; // [Item!]!
    money: number; // Int!
    username: string; // String!
  }
  UserDetails: { // field return type
    firstName: string | null; // String
    id: string; // ID!
    lastName: string | null; // String
    userId: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  Item: { // field return type name
    PartName: 'PartName'
    SaberPart: 'SaberPart'
    User: 'User'
    carts: 'User'
    id: 'ID'
    partDescription: 'String'
    price: 'Int'
    userId: 'String'
  }
  Mutation: { // field return type name
    _deprecated_field: 'String'
    addToCart: 'Item'
    buyCart: 'Item'
    itemBuy: 'Item'
    itemCreate: 'Item'
    itemSell: 'Item'
    itemUpdatePrice: 'Item'
    removeFromCart: 'Item'
    userCreate: 'User'
    userLogin: 'User'
  }
  PartName: { // field return type name
    id: 'ID'
    name: 'String'
  }
  Query: { // field return type name
    _deprecated_field: 'String'
    displayItems: 'Item'
    filterItems: 'Item'
    items: 'Item'
    myq: 'String'
    userDetails: 'User'
    users: 'User'
  }
  SaberPart: { // field return type name
    id: 'ID'
    name: 'String'
  }
  User: { // field return type name
    cart: 'Item'
    id: 'ID'
    inventory: 'Item'
    money: 'Int'
    username: 'String'
  }
  UserDetails: { // field return type name
    firstName: 'String'
    id: 'ID'
    lastName: 'String'
    userId: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addToCart: { // args
      itemId: string; // String!
      userId: string; // String!
    }
    buyCart: { // args
      userId: string; // String!
    }
    itemBuy: { // args
      itemId: string; // String!
      userBuyerId: string; // String!
    }
    itemSell: { // args
      itemId: string; // String!
      userSellerId: string; // String!
    }
    removeFromCart: { // args
      itemId: string; // String!
      userId: string; // String!
    }
    userCreate: { // args
      username: string; // String!
    }
    userLogin: { // args
      username: string; // String!
    }
  }
  Query: {
    displayItems: { // args
      username: string; // String!
    }
    filterItems: { // args
      saberPart: string; // String!
    }
    userDetails: { // args
      userId: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: ContextType;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}