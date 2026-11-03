// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { render } from '@testing-library/react';

import ActionCard, { ActionCardProps } from '../../../lib/components/action-card';
import createWrapper from '../../../lib/components/test-utils/dom';

import styles from '../../../lib/components/action-card/styles.css.js';

function renderActionCard(props: ActionCardProps & { styleClassNames?: Record<string, string> }) {
  const { container } = render(<ActionCard {...props}>Content</ActionCard>);
  return { container, wrapper: createWrapper(container).findActionCard()! };
}

const styleClassNames = { root: 'a', header: 'b', unknown: 'c' };

describe('ActionCard Style API v2', () => {
  test('applies each slot class to its element and ignores unknown keys', () => {
    const { container, wrapper } = renderActionCard({ header: 'Header', description: 'Description', styleClassNames });
    expect(wrapper.getElement()).toHaveClass('a');
    expect(container.querySelector('.b')).toHaveClass(styles.header);
    expect(container.querySelectorAll('.a, .b')).toHaveLength(2);
    expect(container.querySelector('.c')).toBeNull();
  });

  test('applies the header class to the header next to a top-aligned icon', () => {
    const { container } = renderActionCard({
      header: 'Header',
      icon: <span />,
      iconVerticalAlignment: 'top',
      styleClassNames,
    });
    const header = container.querySelector('.b')!;
    expect(header).toHaveClass(styles.header);
    expect(header.parentElement).toHaveClass(styles['header-row']);
    expect(container.querySelectorAll('.b')).toHaveLength(1);
  });

  test('applies the header class when only a description is set', () => {
    const { container } = renderActionCard({ description: 'Description', styleClassNames });
    expect(container.querySelector('.b')).toHaveClass(styles.header);
  });

  test('renders no header class when neither header nor description is set', () => {
    const { container } = renderActionCard({ ariaLabel: 'Card', styleClassNames });
    expect(container.querySelector('.b')).toBeNull();
  });

  test('applies the root class with href and when disabled', () => {
    const link = renderActionCard({ header: 'Link', href: '#', styleClassNames });
    expect(link.wrapper.getElement()).toHaveClass('a');
    const disabled = renderActionCard({ header: 'Disabled', disabled: true, styleClassNames });
    expect(disabled.wrapper.getElement()).toHaveClass('a');
  });

  test('does not leak the styleClassNames prop to the DOM', () => {
    const { container } = renderActionCard({ header: 'Header', styleClassNames });
    expect(container.querySelector('[styleClassNames]')).toBeNull();
  });
});
