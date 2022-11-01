class ContactMapper {
  toPersistence(domaninContact) {
    return {
      id: domaninContact.id,
      name: domaninContact.name,
      email: domaninContact.email,
      phone: domaninContact.phone,
      category_id: domaninContact.categoryId,
    };
  }

  toDomain(persistenceContact) {
    return {
      id: persistenceContact.id,
      name: persistenceContact.name,
      email: persistenceContact.email,
      phone: persistenceContact.phone,
      category: {
        id: persistenceContact.category_id,
        name: persistenceContact.category_name,
      },
    };
  }
}

export default new ContactMapper();
