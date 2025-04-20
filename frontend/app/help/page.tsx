import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, HelpCircle, Info, Mail } from "lucide-react"

export default function HelpPage() {
  return (
    <main className="container mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Help & Resources</h1>

      <Tabs defaultValue="faq" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="faq">
            <HelpCircle className="h-4 w-4 mr-2" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="guides">
            <BookOpen className="h-4 w-4 mr-2" />
            Guides
          </TabsTrigger>
          <TabsTrigger value="about">
            <Info className="h-4 w-4 mr-2" />
            About
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Mail className="h-4 w-4 mr-2" />
            Contact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>Find answers to common questions about PC building and our platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How accurate is the compatibility checker?</AccordionTrigger>
                  <AccordionContent>
                    Our compatibility checker uses a comprehensive database of component specifications to verify
                    compatibility. It checks for socket compatibility between CPUs and motherboards, RAM compatibility,
                    power requirements, physical dimensions, and more. While we strive for accuracy, we recommend
                    double-checking critical compatibility factors before making a purchase.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>How do I save my PC build?</AccordionTrigger>
                  <AccordionContent>
                    Once you've added components to your build, click the "Save Build" button in the build list panel.
                    Your build will be saved locally in your browser's storage. You can access your saved builds from
                    the "Saved Builds" section. For more permanent storage, you can export your build as a PDF or
                    generate a shareable link.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>Are the prices up-to-date?</AccordionTrigger>
                  <AccordionContent>
                    We strive to provide the most current pricing information available. Prices are updated regularly
                    from various retailers. However, prices can fluctuate frequently, so we recommend checking the
                    retailer's website for the most current pricing before making a purchase decision.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I share my build with others?</AccordionTrigger>
                  <AccordionContent>
                    You can share your build by clicking the "Share" button in the build list panel. This will generate
                    a unique URL that you can copy and share with others. Anyone with this link can view your build
                    configuration. You can also export your build as a PDF or submit it to the community section.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>How can I contribute to the community?</AccordionTrigger>
                  <AccordionContent>
                    You can contribute by submitting your completed builds to the community section, creating build
                    guides, writing reviews for components you've used, and participating in discussions on other users'
                    builds. Your contributions help other builders make informed decisions.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guides" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Beginner's Guides</CardTitle>
              <CardDescription>Helpful resources for those new to PC building</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">PC Building Basics</h3>
                  <p className="text-muted-foreground mb-2">
                    Learn the fundamentals of PC building, including component selection, assembly, and troubleshooting.
                  </p>
                  <a href="/guides/basics" className="text-primary hover:underline">
                    Read guide →
                  </a>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Understanding PC Components</h3>
                  <p className="text-muted-foreground mb-2">
                    A comprehensive overview of each PC component, their functions, and what to look for when selecting
                    them.
                  </p>
                  <a href="/guides/components" className="text-primary hover:underline">
                    Read guide →
                  </a>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">First-Time Builder's Checklist</h3>
                  <p className="text-muted-foreground mb-2">
                    A step-by-step checklist to ensure you have everything you need for a successful first build.
                  </p>
                  <a href="/guides/checklist" className="text-primary hover:underline">
                    Read guide →
                  </a>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Troubleshooting Common Issues</h3>
                  <p className="text-muted-foreground mb-2">
                    Solutions to common problems encountered during and after the PC building process.
                  </p>
                  <a href="/guides/troubleshooting" className="text-primary hover:underline">
                    Read guide →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>About PC Part Visualizer</CardTitle>
              <CardDescription>Learn more about our platform and mission</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Our Mission</h3>
                  <p className="text-muted-foreground">
                    PC Part Visualizer was created to simplify the PC building process for enthusiasts of all experience
                    levels. Our mission is to provide a comprehensive, user-friendly platform that helps users select
                    compatible components, visualize their builds, and share their creations with a community of
                    like-minded individuals.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Features</h3>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    <li>Interactive component selection with compatibility checking</li>
                    <li>3D visualization of PC builds</li>
                    <li>Price comparison across multiple retailers</li>
                    <li>Build saving and sharing capabilities</li>
                    <li>Community section for sharing completed builds</li>
                    <li>Comprehensive build guides and resources</li>
                    <li>Detailed component database with specifications and reviews</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Technology</h3>
                  <p className="text-muted-foreground">
                    PC Part Visualizer is built using modern web technologies including React, Next.js, Three.js for 3D
                    visualization, and a comprehensive component database. Our platform is designed to be fast,
                    responsive, and accessible on all devices.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Credits</h3>
                  <p className="text-muted-foreground">
                    PC Part Visualizer was developed as a project for the Software Engineering course. Special thanks to
                    all contributors who helped make this platform possible.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>Get in touch with our team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Support</h3>
                  <p className="text-muted-foreground mb-2">
                    For general support inquiries, feature requests, or bug reports.
                  </p>
                  <a href="mailto:support@pcpartvisualizer.com" className="text-primary hover:underline">
                    support@pcpartvisualizer.com
                  </a>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Partnerships</h3>
                  <p className="text-muted-foreground mb-2">
                    For business inquiries, partnerships, or collaboration opportunities.
                  </p>
                  <a href="mailto:partners@pcpartvisualizer.com" className="text-primary hover:underline">
                    partners@pcpartvisualizer.com
                  </a>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Feedback</h3>
                  <p className="text-muted-foreground mb-2">
                    We value your feedback! Let us know how we can improve our platform.
                  </p>
                  <a href="mailto:feedback@pcpartvisualizer.com" className="text-primary hover:underline">
                    feedback@pcpartvisualizer.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
