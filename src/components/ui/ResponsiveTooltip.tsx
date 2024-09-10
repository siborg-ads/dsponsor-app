import * as Popover from "@radix-ui/react-popover";
import * as Tooltip from "@radix-ui/react-tooltip";

const ResponsiveTooltip = ({ text, children }) => {
  const handleClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <>
      <div className="md:hidden cursor-help" onClick={handleClick}>
        <Popover.Root>
          <Popover.Trigger asChild>
            <span>{children}</span>
          </Popover.Trigger>
          <Popover.Anchor />
          <Popover.Portal>
            {text && text.length && (
              <Popover.Content
                align="center"
                side="bottom"
                className="bg-secondaryBlack z-[1000] max-w-xs md:max-w-lg p-2 rounded-md text-sm shadow-lg border border-jacarta-100 border-opacity-10"
              >
                {text} f
              </Popover.Content>
            )}
          </Popover.Portal>
        </Popover.Root>
      </div>

      <div className="hidden md:block cursor-help" onClick={handleClick}>
        <Tooltip.Provider delayDuration={0}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <span>{children}</span>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              {text && text.length && (
                <Tooltip.Content className="bg-secondaryBlack z-[1000] max-w-xs md:max-w-lg p-2 text-sm rounded-md shadow-lg border border-jacarta-100 border-opacity-10">
                  {text}
                </Tooltip.Content>
              )}
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </>
  );
};

export default ResponsiveTooltip;
