import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signupContent } from "@/content/signup"
import { Brand } from "../brand"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="justify-center">
           <Brand />
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">{signupContent.nameLabel}</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder={signupContent.namePlaceholder}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">{signupContent.emailLabel}</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder={signupContent.emailPlaceholder}
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">
                      {signupContent.passwordLabel}
                    </FieldLabel>
                    <Input id="password" type="password" required />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      {signupContent.confirmPasswordLabel}
                    </FieldLabel>
                    <Input id="confirm-password" type="password" required />
                  </Field>
                </Field>
                <FieldDescription>{signupContent.passwordHint}</FieldDescription>
              </Field>
              <Field>
                <Button type="submit">{signupContent.submitLabel}</Button>
                <FieldDescription className="text-center">
                  {signupContent.loginPrompt}{" "}
                  <a href="/login">{signupContent.loginLink}</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
