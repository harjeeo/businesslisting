// Temporary in-memory data store. Swap this file's implementation for a
// PostgreSQL-backed repository layer once a database is provisioned — the
// route/controller layer only depends on the Collection interface below.

export interface Collection<T extends { id: number }> {
  all(): T[];
  find(id: number): T | undefined;
  create(data: Omit<T, "id">): T;
  update(id: number, data: Partial<Omit<T, "id">>): T | undefined;
  remove(id: number): boolean;
}

export function createCollection<T extends { id: number }>(seed: T[]): Collection<T> {
  const rows = [...seed];

  const nextId = () => (rows.length === 0 ? 1 : Math.max(...rows.map((r) => r.id)) + 1);

  return {
    all: () => rows,
    find: (id) => rows.find((r) => r.id === id),
    create: (data) => {
      const row = { ...data, id: nextId() } as T;
      rows.push(row);
      return row;
    },
    update: (id, data) => {
      const index = rows.findIndex((r) => r.id === id);
      if (index === -1) return undefined;
      rows[index] = { ...rows[index], ...data };
      return rows[index];
    },
    remove: (id) => {
      const index = rows.findIndex((r) => r.id === id);
      if (index === -1) return false;
      rows.splice(index, 1);
      return true;
    },
  };
}
