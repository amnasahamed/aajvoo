PRAGMA foreign_keys=ON;
CREATE TABLE weddings(id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, template TEXT NOT NULL, draft TEXT NOT NULL, revision INTEGER NOT NULL DEFAULT 1, published TEXT, status TEXT NOT NULL DEFAULT 'inquiry', created TEXT NOT NULL);
CREATE TABLE versions(id TEXT PRIMARY KEY, wedding TEXT NOT NULL REFERENCES weddings(id), snapshot TEXT NOT NULL, created TEXT NOT NULL, actor TEXT NOT NULL);
CREATE TABLE media(id TEXT PRIMARY KEY, wedding TEXT NOT NULL REFERENCES weddings(id), mime TEXT NOT NULL, bytes INTEGER NOT NULL, created TEXT NOT NULL);
CREATE TABLE payments(id TEXT PRIMARY KEY, wedding TEXT NOT NULL REFERENCES weddings(id), amount INTEGER NOT NULL CHECK(amount != 0), currency TEXT NOT NULL, method TEXT NOT NULL, paid_on TEXT NOT NULL, note TEXT NOT NULL, reverses TEXT UNIQUE REFERENCES payments(id), actor TEXT NOT NULL, created TEXT NOT NULL);
CREATE TABLE audit(id TEXT PRIMARY KEY, wedding TEXT NOT NULL REFERENCES weddings(id), action TEXT NOT NULL, actor TEXT NOT NULL, created TEXT NOT NULL);
CREATE TRIGGER immutable_versions_update BEFORE UPDATE ON versions BEGIN SELECT RAISE(ABORT,'immutable'); END;
CREATE TRIGGER immutable_payments_update BEFORE UPDATE ON payments BEGIN SELECT RAISE(ABORT,'immutable'); END;
