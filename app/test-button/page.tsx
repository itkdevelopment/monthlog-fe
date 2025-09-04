import { Button } from "@/components/monthlog/ui/button";

export default function TestButtonPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Button Component Test</h1>
        
        {/* Default Variant */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Default Variant</h2>
          <div className="flex flex-wrap gap-4">
            <Button color="primary">Primary Button</Button>
            <Button color="grayscale">Grayscale Button</Button>
            <Button color="neutral">Neutral Button</Button>
            <Button color="destructive">Destructive Button</Button>
          </div>
        </section>

        {/* Outline Variant */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Outline Variant</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" color="primary">Primary Outline</Button>
            <Button variant="outline" color="grayscale">Grayscale Outline</Button>
            <Button variant="outline" color="neutral">Neutral Outline</Button>
            <Button variant="outline" color="destructive">Destructive Outline</Button>
          </div>
        </section>

        {/* Ghost Variant */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Ghost Variant</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="ghost" color="primary">Primary Ghost</Button>
            <Button variant="ghost" color="grayscale">Grayscale Ghost</Button>
            <Button variant="ghost" color="neutral">Neutral Ghost</Button>
            <Button variant="ghost" color="destructive">Destructive Ghost</Button>
          </div>
        </section>

        {/* Link Variant */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Link Variant</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="link" color="primary">Primary Link</Button>
            <Button variant="link" color="grayscale">Grayscale Link</Button>
            <Button variant="link" color="neutral">Neutral Link</Button>
            <Button variant="link" color="destructive">Destructive Link</Button>
          </div>
        </section>

        {/* Different Sizes */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Different Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" color="primary">Small</Button>
            <Button size="default" color="primary">Default</Button>
            <Button size="lg" color="primary">Large</Button>
            <Button size="xl" color="primary">Extra Large</Button>
            <Button size="icon" color="primary">🔥</Button>
          </div>
        </section>

        {/* Loading State */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Loading State</h2>
          <div className="flex flex-wrap gap-4">
            <Button loading color="primary">Loading...</Button>
            <Button loading variant="outline" color="grayscale">Loading...</Button>
          </div>
        </section>

        {/* Example from your use case */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Price Satisfaction Example</h2>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((score) => (
              <Button
                key={score}
                size="xl"
                color={score === 3 ? "neutral" : "grayscale"}
                className="font-bold"
              >
                {score}
              </Button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
