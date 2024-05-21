import * as React from 'react';

export function Tree2Element(tree) {
    return (
        tree &&
        tree.map((node, i) =>
            React.createElement(
                node.tag,
                { key: i, ...node.attr },
                Tree2Element(node.child),
            ),
        )
    );
}

export function GenIcon(data) {
    return (props) => (
        <IconBase attr={{ ...data.attr }} {...props}>
            {Tree2Element(data.child)}
        </IconBase>
    );
}

export function IconBase(props) {
    const { attr, size, title, ...svgProps } = props;
    const computedSize = size || '1em';
    let className = props.className || '';

    return (
        <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            {...attr}
            {...svgProps}
            className={className}
            style={{ color: props.color, ...props.style }}
            height={computedSize}
            width={computedSize}
            xmlns="http://www.w3.org/2000/svg"
        >
            {title && <title>{title}</title>}
            {props.children}
        </svg>
    );
}
