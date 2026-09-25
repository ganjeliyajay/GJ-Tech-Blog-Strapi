import React from "react";

type BlockChild = {
    text?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    code?: boolean;
};

type Block = {
    type: string;
    children?: BlockChild[];
};

interface StrapiBlocksProps {
    description?: Block[];
}

export default function StrapiBlocks({
    description,
}: StrapiBlocksProps) {
    if (!description?.length) {
        return null;
    }

    const renderChild = (
        child: BlockChild,
        index: number
    ): React.ReactNode => {
        let content: React.ReactNode = child.text || "";

        if (child.code) {
            content = (
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono">
                    {content}
                </code>
            );
        }

        if (child.bold) {
            content = <strong>{content}</strong>;
        }

        if (child.italic) {
            content = <em>{content}</em>;
        }

        if (child.underline) {
            content = <u>{content}</u>;
        }

        if (child.strikethrough) {
            content = <s>{content}</s>;
        }

        return <React.Fragment key={index}>{content}</React.Fragment>;
    };

    return (
        <div className="space-y-6">
            {description.map((block, index) => {
                const children = block.children || [];

                switch (block.type) {
                    case "paragraph":
                        return (
                            <p
                                key={index}
                                className="text-lg leading-8 text-slate-600"
                            >
                                {children.map(renderChild)}
                            </p>
                        );

                    case "heading":
                        return (
                            <h2
                                key={index}
                                className="mt-10 text-3xl font-bold text-slate-900"
                            >
                                {children.map(renderChild)}
                            </h2>
                        );
                    case "list":
                        return (
                            <ul
                                key={index}
                                className="list-disc space-y-2 pl-6 text-lg leading-8 text-slate-600"
                            >
                                {children.map(renderChild)}
                            </ul>
                        );

                    case "list-item":
                        return (
                            <li
                                key={index}
                                className="text-lg leading-8 text-slate-600"
                            >
                                {children.map(renderChild)}
                            </li>
                        );
                    case "quote":
                        return (
                            <blockquote
                                key={index}
                                className="border-l-4 border-blue-600 pl-6 text-lg italic leading-8 text-slate-600"
                            >
                                {children.map(renderChild)}
                            </blockquote>
                        );

                    case "code":
                        return (
                            <pre
                                key={index}
                                className="overflow-x-auto rounded-xl bg-slate-900 p-5 text-sm leading-7 text-slate-100"
                            >
                                <code>
                                    {children.map(renderChild)}
                                </code>
                            </pre>
                        );

                    default:
                        return (
                            <p
                                key={index}
                                className="text-lg leading-8 text-slate-600"
                            >
                                {children.map(renderChild)}
                            </p>
                        );
                }
            })}
        </div>
    );
}