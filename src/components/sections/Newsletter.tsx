import { useEffect, useMemo, useState } from "react";
import {
  MessageCircleHeart,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";
import { products } from "@/data/productData";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

const WHATSAPP_NUMBER = "919999999999";
type CustomerReview = Tables<"customer_reviews">;
type ProductReview = Tables<"reviews">;
type DisplayReview = Pick<CustomerReview, "id" | "reviewer_name" | "review_text" | "created_at">;

const isMissingCustomerReviewsTable = (error: { code?: string; message?: string }) =>
  error.code === "PGRST205" ||
  error.message?.includes("customer_reviews") ||
  error.message?.includes("schema cache");

const mapProductReviewToDisplayReview = (review: ProductReview): DisplayReview => ({
  id: review.id,
  reviewer_name: review.title || "Customer",
  review_text: review.comment,
  created_at: review.created_at,
});

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [panel, setPanel] = useState<"review" | "bulk" | null>(null);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState<DisplayReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewSaving, setReviewSaving] = useState(false);
  const [selectedBulk, setSelectedBulk] = useState<string[]>([]);

  const bulkItems = useMemo(
    () => products.map((product) => product.name),
    []
  );

  const loadReviews = async () => {
    setReviewsLoading(true);

    const { data, error } = await supabase
      .from("customer_reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) {
      if (isMissingCustomerReviewsTable(error)) {
        const { data: productReviews, error: productReviewsError } = await supabase
          .from("reviews")
          .select("id, title, comment, created_at")
          .eq("is_approved", true)
          .order("created_at", { ascending: false })
          .limit(6);

        setReviewsLoading(false);

        if (productReviewsError) {
          console.error("Unable to load product reviews:", productReviewsError);
          toast.error("Unable to load customer reviews.");
          return;
        }

        setReviews((productReviews ?? []).map(mapProductReviewToDisplayReview));
        return;
      }

      setReviewsLoading(false);
      console.error("Unable to load customer reviews:", error);
      toast.error("Unable to load customer reviews.");
      return;
    }

    setReviewsLoading(false);
    setReviews(data ?? []);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleSubscribe = (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    toast.success("Subscribed successfully!");
    setEmail("");
  };

  const handleReviewSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!reviewName.trim() || !reviewText.trim()) {
      toast.error("Please enter your name and review.");
      return;
    }

    setReviewSaving(true);

    const { data, error } = await supabase
      .from("customer_reviews")
      .insert({
        reviewer_name: reviewName.trim(),
        review_text: reviewText.trim(),
      })
      .select()
      .single();

    setReviewSaving(false);

    if (error) {
      console.error("Unable to save customer review:", error);
      if (isMissingCustomerReviewsTable(error)) {
        toast.error("Customer reviews are not set up in Supabase yet.");
        return;
      }

      toast.error(error.message || "Unable to save your review. Please try again.");
      return;
    }

    if (data) {
      setReviews((current) => [data, ...current].slice(0, 6));
    }

    toast.success("Thank you for sharing your taste journey!");
    setReviewName("");
    setReviewText("");
    setPanel(null);
  };

  const toggleBulkItem = (item: string) => {
    setSelectedBulk((current) =>
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item]
    );
  };

  const bulkMessage = encodeURIComponent(
    `Hi Ram Pickel Mart! I want bulk order details for: ${
      selectedBulk.length > 0 ? selectedBulk.join(", ") : "your available items"
    }`
  );

  return (
    <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">

      <div className="max-w-6xl mx-auto">

        {/* Main Card */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
            md:rounded-[40px]
            bg-gradient-to-r
            from-[#7a2e0b]
            via-[#a14516]
            to-[#d97706]
            px-5
            sm:px-8
            md:px-16
            py-12
            sm:py-14
            md:py-16
            shadow-2xl
          "
        >

          {/* Background Glow */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-300/20 blur-3xl"></div>

          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-yellow-200/20 blur-3xl"></div>

          {/* Content */}
          <div className="relative z-10 text-center">

            {/* Heading */}
            <h2
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-extrabold
                text-white
                leading-tight
              "
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Stay Connected With RamPickelMart
            </h2>

            {/* Subtitle */}
            <p
              className="
                mt-5
                text-sm
                sm:text-base
                md:text-xl
                text-orange-100
                max-w-3xl
                mx-auto
                leading-relaxed
                px-2
              "
            >
              Loved our homemade Andhra flavors? Share your experience with us
              and connect for festive hampers, catering, and bulk orders.
            </p>

            {/* Subscribe Box */}
            <form
              onSubmit={handleSubscribe}
              className="
                mt-10
                flex
                flex-col
                sm:flex-row
                items-center
                justify-center
                gap-4
                w-full
              "
            >

              {/* Email Input */}
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                className="
                  h-14
                  w-full
                  sm:w-[360px]
                  md:w-[380px]
                  rounded-full
                  border
                  border-white/20
                  bg-white/10
                  px-6
                  text-white
                  placeholder:text-orange-100
                  backdrop-blur-md
                  outline-none
                  shadow-lg
                  focus:ring-2
                  focus:ring-orange-200
                "
              />

              {/* Subscribe Button */}
              <button
                type="submit"
                className="
                  h-14
                  w-full
                  sm:w-auto
                  rounded-full
                  bg-white
                  px-8
                  font-semibold
                  text-[#a14516]
                  shadow-xl
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-orange-50
                "
              >
                Subscribe
              </button>

            </form>

            {/* DESKTOP BUTTONS */}
            <div
              className="
                hidden
                md:flex
                mt-12
                items-center
                justify-center
                gap-5
              "
            >

              {/* Review Button */}
              <button
                type="button"
                onClick={() => setPanel(panel === "review" ? null : "review")}
                className="
                  group
                  h-14
                  rounded-full
                  bg-white
                  px-8
                  font-semibold
                  text-[#a14516]
                  shadow-xl
                  transition-all
                  duration-300
                  hover:scale-105
                  hover:bg-orange-50
                "
              >
                <span className="flex items-center gap-3">

                  <MessageCircleHeart className="h-5 w-5" />

                  Share Your Taste Journey

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    *
                  </span>

                </span>
              </button>

              {/* Bulk Orders Button */}
              <button
                type="button"
                onClick={() => setPanel(panel === "bulk" ? null : "bulk")}
                className="
                  group
                  h-14
                  rounded-full
                  border
                  border-white
                  bg-transparent
                  px-8
                  font-semibold
                  text-white
                  shadow-xl
                  transition-all
                  duration-300
                  hover:bg-white
                  hover:text-[#a14516]
                  hover:scale-105
                "
              >
                <span className="flex items-center gap-3">

                  <ShoppingBag className="h-5 w-5" />

                  Ping Us For Bulk Orders

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    -&gt;
                  </span>

                </span>
              </button>

            </div>

            {/* MOBILE & TABLET HORIZONTAL SCROLL */}
            <div
              className="
                md:hidden
                mt-10
                flex
                gap-4
                overflow-x-auto
                pb-2
                snap-x
                snap-mandatory
                scrollbar-hide
              "
            >

              {/* Review Button */}
              <button
                type="button"
                onClick={() => setPanel(panel === "review" ? null : "review")}
                className="
                  group
                  min-w-[280px]
                  h-14
                  rounded-full
                  bg-white
                  px-6
                  font-semibold
                  text-[#a14516]
                  shadow-xl
                  transition-all
                  duration-300
                  snap-center
                  flex-shrink-0
                "
              >
                <span className="flex items-center justify-center gap-3">

                  <MessageCircleHeart className="h-5 w-5" />

                  Share Your Taste Journey

                  <span>
                    *
                  </span>

                </span>
              </button>

              {/* Bulk Orders Button */}
              <button
                type="button"
                onClick={() => setPanel(panel === "bulk" ? null : "bulk")}
                className="
                  group
                  min-w-[280px]
                  h-14
                  rounded-full
                  border
                  border-white
                  bg-transparent
                  px-6
                  font-semibold
                  text-white
                  shadow-xl
                  transition-all
                  duration-300
                  snap-center
                  flex-shrink-0
                "
              >
                <span className="flex items-center justify-center gap-3">

                  <ShoppingBag className="h-5 w-5" />

                  Ping Us For Bulk Orders

                  <span>
                    -&gt;
                  </span>

                </span>
              </button>

            </div>

            {panel === "review" && (
              <form
                onSubmit={handleReviewSubmit}
                className="mx-auto mt-8 max-w-2xl rounded-2xl border border-white/20 bg-white p-5 text-left shadow-xl"
              >
                <h3 className="text-xl font-bold text-[#7a2e0b]">
                  Share Your Taste Journey
                </h3>

                <div className="mt-4 grid gap-4">
                  <input
                    value={reviewName}
                    onChange={(event) => setReviewName(event.target.value)}
                    placeholder="Your name"
                    className="h-12 rounded-lg border border-orange-200 px-4 text-[#2e1a10] outline-none focus:ring-2 focus:ring-orange-300"
                  />

                  <textarea
                    value={reviewText}
                    onChange={(event) => setReviewText(event.target.value)}
                    placeholder="Write your review"
                    rows={4}
                    className="resize-none rounded-lg border border-orange-200 px-4 py-3 text-[#2e1a10] outline-none focus:ring-2 focus:ring-orange-300"
                  />

                  <button
                    type="submit"
                    disabled={reviewSaving}
                    className="h-12 rounded-full bg-[#a14516] px-6 font-semibold text-white shadow-lg hover:bg-[#7a2e0b]"
                  >
                    {reviewSaving ? "Saving..." : "Submit Review"}
                  </button>
                </div>
              </form>
            )}

            {panel === "bulk" && (
              <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-white/20 bg-white p-5 text-left shadow-xl">
                <h3 className="text-xl font-bold text-[#7a2e0b]">
                  Bulk Order Items
                </h3>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {bulkItems.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-3 rounded-lg border border-orange-100 px-4 py-3 text-sm font-semibold text-[#2e1a10]"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBulk.includes(item)}
                        onChange={() => toggleBulkItem(item)}
                        className="h-4 w-4 accent-[#a14516]"
                      />
                      {item}
                    </label>
                  ))}
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${bulkMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex h-12 items-center justify-center rounded-full bg-[#a14516] px-6 font-semibold text-white shadow-lg hover:bg-[#7a2e0b]"
                >
                  Send Bulk Order Request
                </a>
              </div>
            )}

            <div className="mx-auto mt-10 max-w-5xl text-left">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-bold text-white">
                  Customer Reviews
                </h3>

                {reviews.length > 0 && (
                  <span className="text-sm font-semibold text-orange-100">
                    Latest {reviews.length}
                  </span>
                )}
              </div>

              {reviewsLoading ? (
                <p className="mt-4 text-sm text-orange-100">
                  Loading reviews...
                </p>
              ) : reviews.length === 0 ? (
                <p className="mt-4 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-orange-100">
                  No reviews yet. Be the first to share your taste journey.
                </p>
              ) : (
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {reviews.map((review) => (
                    <article
                      key={review.id}
                      className="rounded-2xl bg-white p-5 shadow-xl"
                    >
                      <p className="text-sm leading-relaxed text-[#5c3b25]">
                        "{review.review_text}"
                      </p>

                      <p className="mt-4 font-bold text-[#7a2e0b]">
                        {review.reviewer_name}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}
