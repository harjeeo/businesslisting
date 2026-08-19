// Repository interface the route layer depends on. The Prisma-backed
// implementation lives in repository.ts — swap that file's internals if the
// storage layer ever needs to change again without touching routes.

export interface Collection<T extends { id: number }> {
  all(): Promise<T[]>;
  find(id: number): Promise<T | null>;
  create(data: Omit<T, "id">): Promise<T>;
  update(id: number, data: Partial<Omit<T, "id">>): Promise<T | null>;
  remove(id: number): Promise<boolean>;
}

interface PrismaDelegate<T> {
  findMany(): Promise<T[]>;
  findUnique(args: { where: { id: number } }): Promise<T | null>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(args: { data: any }): Promise<T>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(args: { where: { id: number }; data: any }): Promise<T>;
  delete(args: { where: { id: number } }): Promise<T>;
}

export function createPrismaCollection<T extends { id: number }>(
  delegate: PrismaDelegate<T>
): Collection<T> {
  return {
    all: () => delegate.findMany(),
    find: (id) => delegate.findUnique({ where: { id } }),
    create: (data) => delegate.create({ data }),
    update: async (id, data) => {
      try {
        return await delegate.update({ where: { id }, data });
      } catch {
        return null;
      }
    },
    remove: async (id) => {
      try {
        await delegate.delete({ where: { id } });
        return true;
      } catch {
        return false;
      }
    },
  };
}
