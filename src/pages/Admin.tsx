import { FormEvent, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LogOut, PackagePlus, PlusCircle, ShieldCheck, Trash2 } from "lucide-react";
import { categories, Product, products as productSeed } from "@/data/products";

type AdminTab = "products" | "add" | "orders";

type AdminProduct = Product & {
  actualPrice: number;
  stock: number;
};

const asAdminProduct = (product: Product): AdminProduct => ({
  ...product,
  actualPrice: Math.round(product.price * 1.6),
  stock: product.inStock ? 12 : 0,
});

const emptyProduct = {
  name: "",
  actualPrice: "",
  offerPrice: "",
  category: "Pickles",
  image: "",
  stock: "1",
};

const Admin = () => {
  const { user, session, signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<AdminTab>("products");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [adminProducts, setAdminProducts] = useState<AdminProduct[]>(() => productSeed.map(asAdminProduct));
  const [draft, setDraft] = useState(emptyProduct);

  const totalStock = useMemo(() => adminProducts.reduce((sum, product) => sum + product.stock, 0), [adminProducts]);

  const handleAdminLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoginLoading(true);
    const { error } = await signIn(adminEmail, adminPassword);
    setLoginLoading(false);

    if (error) {
      toast.error(error.message || "Admin login failed.");
      return;
    }

    toast.success("Admin verified.");
  };

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out");
    navigate("/login");
  };

  const handleDelete = (id: string) => {
    setAdminProducts((items) => items.filter((product) => product.id !== id));
    toast.success("Product removed from admin list.");
  };

  const handleAddStock = (id: string) => {
    setAdminProducts((items) =>
      items.map((product) => (product.id === id ? { ...product, stock: product.stock + 1, inStock: true } : product)),
    );
  };

  const handleAddProduct = (event: FormEvent) => {
    event.preventDefault();
    const price = Number(draft.offerPrice);
    const actualPrice = Number(draft.actualPrice);
    const stock = Number(draft.stock);

    if (!draft.name || !price || !actualPrice || !draft.category) {
      toast.error("Fill all product fields.");
      return;
    }

    const id = draft.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const fallbackImage = productSeed[0]?.image ?? "";
    const newProduct: AdminProduct = {
      id,
      slug: id,
      name: draft.name,
      category: draft.category as Product["category"],
      actualPrice,
      price,
      weight: "500 g",
      spiceLevel: 3,
      rating: 0,
      reviewCount: 0,
      inStock: stock > 0,
      stock,
      image: draft.image || fallbackImage,
      short: "New product added from admin.",
      description: "New product added from the admin panel.",
      ingredients: [],
    };

    setAdminProducts((items) => [newProduct, ...items]);
    setDraft(emptyProduct);
    setTab("products");
    toast.success("Product added.");
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-paper">
        <Navbar />
        <main className="container py-12 lg:py-20">
          <div className="mx-auto max-w-md">
            <div className="mb-6 flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h1 className="font-display text-3xl text-ink">Admin Login</h1>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-5 rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="space-y-2">
                <Label htmlFor="adminEmail">Name / Email</Label>
                <Input
                  id="adminEmail"
                  type="email"
                  value={adminEmail}
                  onChange={(event) => setAdminEmail(event.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminPassword">Password</Label>
                <Input
                  id="adminPassword"
                  type="password"
                  value={adminPassword}
                  onChange={(event) => setAdminPassword(event.target.value)}
                  placeholder="Password"
                  required
                  className="rounded-xl"
                />
              </div>

              <Button disabled={loginLoading} className="w-full rounded-xl bg-ink text-paper hover:bg-primary">
                {loginLoading ? "Verifying..." : "Verify"}
              </Button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main className="container py-8 lg:py-12">
        <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h1 className="font-display text-3xl text-ink">Admin Page</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Signed in as <span className="font-semibold text-ink">{user?.email ?? "admin"}</span>. Total stock:{" "}
              <span className="font-semibold text-ink">{totalStock}</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setTab("products")}
              className={`rounded-xl ${tab === "products" ? "bg-ink text-paper" : "border border-border text-ink hover:bg-muted"}`}
            >
              Product List
            </Button>
            <Button
              onClick={() => setTab("add")}
              className={`rounded-xl ${tab === "add" ? "bg-ink text-paper" : "border border-border text-ink hover:bg-muted"}`}
            >
              <PackagePlus className="mr-2 h-4 w-4" /> Add Product
            </Button>
            <Button
              onClick={() => setTab("orders")}
              className={`rounded-xl ${tab === "orders" ? "bg-ink text-paper" : "border border-border text-ink hover:bg-muted"}`}
            >
              Orders
            </Button>
            <Button onClick={handleLogout} className="rounded-xl border border-border text-ink hover:bg-muted">
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button>
          </div>
        </div>

        {tab === "products" && (
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="bg-muted/60 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Actual Price</th>
                  <th className="px-4 py-3">Offer Price</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Delete Product</th>
                  <th className="px-4 py-3">Add Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {adminProducts.map((product) => (
                  <tr key={product.id} className="align-middle">
                    <td className="px-4 py-4">
                      <img src={product.image} alt={product.name} className="h-16 w-16 rounded-lg object-cover" />
                    </td>
                    <td className="px-4 py-4 font-medium text-ink">
                      {product.name}
                      <div className="text-xs text-muted-foreground">Stock: {product.stock}</div>
                    </td>
                    <td className="px-4 py-4">Rs. {product.actualPrice}</td>
                    <td className="px-4 py-4 font-semibold text-primary">Rs. {product.price}</td>
                    <td className="px-4 py-4">{product.category}</td>
                    <td className="px-4 py-4">
                      <Button onClick={() => handleDelete(product.id)} aria-label={`Delete ${product.name}`}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </td>
                    <td className="px-4 py-4">
                      <Button onClick={() => handleAddStock(product.id)} aria-label={`Add stock for ${product.name}`}>
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "add" && (
          <form onSubmit={handleAddProduct} className="grid gap-5 rounded-2xl border border-border bg-card p-6 shadow-soft md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="productName">Product Name</Label>
              <Input id="productName" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productImage">Image URL</Label>
              <Input id="productImage" value={draft.image} onChange={(event) => setDraft({ ...draft, image: event.target.value })} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="actualPrice">Actual Price</Label>
              <Input id="actualPrice" type="number" min="1" value={draft.actualPrice} onChange={(event) => setDraft({ ...draft, actualPrice: event.target.value })} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="offerPrice">Offer Price</Label>
              <Input id="offerPrice" type="number" min="1" value={draft.offerPrice} onChange={(event) => setDraft({ ...draft, offerPrice: event.target.value })} className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={draft.category}
                onChange={(event) => setDraft({ ...draft, category: event.target.value })}
                className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm"
              >
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" type="number" min="0" value={draft.stock} onChange={(event) => setDraft({ ...draft, stock: event.target.value })} className="rounded-xl" />
            </div>
            <div className="md:col-span-2">
              <Button className="rounded-xl bg-ink text-paper hover:bg-primary">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </div>
          </form>
        )}

        {tab === "orders" && (
          <div className="rounded-2xl border border-border bg-card p-8 text-sm text-muted-foreground">
            Orders will appear here after checkout data is connected.
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
