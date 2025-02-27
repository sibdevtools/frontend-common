import React, { ReactNode } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/types';

export interface LoaderProps {
  loading?: boolean;
  animation?: 'border' | 'grow';
  variant?: Variant;
  children?: ReactNode;
}

/**
 * Full parent element loader
 *
 * @param loading flag indicate show loader or hide
 * @param animation used animation style, border by default
 * @param variant used loader style, dark by default
 * @param children children nodes of component, shown then loading flag is false
 * @constructor create loader component
 */
export const Loader: React.FC<LoaderProps> = ({
                                                loading = true,
                                                animation = 'border',
                                                variant = 'dark',
                                                children
                                              }) => {

  if (!loading) {
    return children ?? <></>;
  }

  return (
    <Container className={'vh-100 vw-100 d-flex justify-content-center'}>
      <Spinner className={'m-auto'} variant={variant} animation={animation}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </Container>
  );
}
