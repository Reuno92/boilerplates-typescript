import { cleanup, render, screen } from '@testing-library/react';
import Home from '../pages';
import '@testing-library/jest-dom';

describe('Home', () => {
  afterEach(() => {
    cleanup();
  });

  it('should a heading', () => {
    render(<Home />);
    const HEADING = screen.getByRole('heading', {
      name: 'Home Page',
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(HEADING).toBeInTheDocument();
  });

  it('should have image', async () => {
    const { getByAltText } = await render(<Home />);
    const IMG = getByAltText('viseo logo positive digital makers');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(IMG).toHaveAttribute('src', 'https://www.viseo.com/themes/viseo/images/logo-viseo--mobile.svg');
  });

  it('should a link for goes to about page', async () => {
    const { getByTitle } = await render(<Home />);
    const LINK = getByTitle('go to about page');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(LINK).toHaveAttribute('href', '/about');
  });
});
