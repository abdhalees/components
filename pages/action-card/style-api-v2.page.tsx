// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import React from 'react';

import { ActionCard, ActionCardProps, Icon, SpaceBetween } from '~components';

import { SimplePage } from '../app/templates';

import styles from './style-api-v2.scss';

const icon = (
  <span className={styles.icon}>
    <Icon name="angle-right" />
  </span>
);

function StyledActionCard(props: ActionCardProps) {
  return (
    <div className={styles.cell}>
      <ActionCard
        description="Launch an instance from a template"
        {...props}
        {...{
          styleClassNames: {
            root: props.disabled ? styles['root-disabled'] : styles.root,
            header: props.disabled ? styles['header-disabled'] : styles.header,
          },
        }}
      />
    </div>
  );
}

export default function () {
  return (
    <SimplePage title="Action card - Style API v2" screenshotArea={{ disableAnimations: true }}>
      <SpaceBetween size="m" direction="horizontal">
        <StyledActionCard header="Default">Content</StyledActionCard>
        <StyledActionCard header="Icon" icon={icon} iconVerticalAlignment="top">
          Content
        </StyledActionCard>
        <StyledActionCard header="Disabled" disabled={true}>
          Content
        </StyledActionCard>
      </SpaceBetween>
      <SpaceBetween size="m" direction="horizontal">
        <StyledActionCard header="Link" href="#">
          Content
        </StyledActionCard>
        <StyledActionCard header="Embedded" variant="embedded">
          Content
        </StyledActionCard>
        <StyledActionCard header="Centered icon" icon={icon} iconVerticalAlignment="center">
          Content
        </StyledActionCard>
      </SpaceBetween>
      <SpaceBetween size="m" direction="horizontal">
        <StyledActionCard header="No content" />
        <StyledActionCard header="No content, icon" icon={icon} iconVerticalAlignment="top" />
        <StyledActionCard>Content</StyledActionCard>
      </SpaceBetween>
    </SimplePage>
  );
}
