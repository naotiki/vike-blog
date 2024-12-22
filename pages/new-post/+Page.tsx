import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  headingsPlugin,
  InsertCodeBlock,
  InsertTable,
  InsertThematicBreak,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "@mdxeditor/editor/style.css";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { onCreatePost } from "./Post.telefunc";
import { navigate } from "vike/client/router";
import { useRef } from "react";

const formSchema = z.object({
  title: z.string().min(1).nonempty(),
  content: z.string().min(1).nonempty(),
});
export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const mdxRef = useRef<MDXEditorMethods>(null);
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const result = await onCreatePost(values);

    if (result?.not_logged_in) {
      navigate("/login");
      return;
    }
    form.reset();
    mdxRef.current?.setMarkdown("");
  }
  return (
    <>
      <h1 className={"font-bold text-3xl pb-4"}>投稿を作成</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>タイトル</FormLabel>
                <FormControl>
                  <Input  {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field:{ref,...field} }) => (
              <FormItem>
                <FormLabel>本文</FormLabel>
                <FormControl>
                  <MDXEditor
                    markdown={field.value}
                    contentEditableClassName="prose max-w-none"
                    plugins={[
                      headingsPlugin(),
                      quotePlugin(),
                      listsPlugin(),
                      thematicBreakPlugin(),
                      tablePlugin(),
                      codeBlockPlugin({ defaultCodeBlockLanguage: "kt" }),
                      codeMirrorPlugin({
                        codeBlockLanguages: {
                          kt: "kotlin",
                        },
                        autoLoadLanguageSupport: true,
                      }),

                      linkPlugin(),
                      markdownShortcutPlugin(),
                      directivesPlugin({
                        directiveDescriptors: [AdmonitionDirectiveDescriptor],
                      }),
                      toolbarPlugin({
                        toolbarClassName: "my-classname",
                        toolbarContents: () => (
                          <>
                            {" "}
                            <UndoRedo />
                            <BlockTypeSelect />
                            <BoldItalicUnderlineToggles />
                            <ListsToggle />
                            <InsertThematicBreak />
                            <InsertTable />
                            <InsertCodeBlock />
                          </>
                        ),
                      }),
                    ]}
                    {...field}
                    ref={(e)=>{
                      ref(e);
                      mdxRef.current = e;
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">投稿する</Button>
        </form>
      </Form>
    </>
  );
}
