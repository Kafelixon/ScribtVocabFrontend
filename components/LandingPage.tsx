import { Typography, Stack } from "@mui/joy";
import StyledCard from "../components/StyledCard";
import { TranslationView } from "./TranslationView";

export const LandingPage = () => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 4, pt: 7 }}
      marginX={{ xs: 10, sm: 20, md: 50, pt: 100 }}
      justifyContent="center"
      alignItems="center"
      mt={12}
      mb={6}
    >
      <StyledCard>
        <Typography
          level="h1"
          fontWeight="xl"
          textAlign="center"
          sx={{ mb: 4, mt: 1 }}
        >
          Welcome to ScriptVocab - Your New Language Learning Companion!
        </Typography>

        <section className="personalizeLearning">
          <h2>Personalize Your Language Learning Journey</h2>
          <p>
            Introducing ScriptVocab, an innovative app that transforms the way
            you learn languages. With ScriptVocab, you're not just memorizing
            words; you're creating a personalized dictionary that resonates with
            your unique learning style and interests.
          </p>
        </section>

        <section className="uniqueDictionary">
          <h2>Craft Your Unique Dictionary with Ease</h2>
          <p>
            Say goodbye to generic vocabulary lists. ScriptVocab empowers you to
            build your own dictionary effortlessly. Whether you're writing text
            or importing subtitles from your favorite movies, TV shows, or
            books, ScriptVocab simplifies the process, making language learning
            both enjoyable and effective.
          </p>
        </section>

        <section className="simplePowerful">
          <h2>Simple Yet Powerful - Your Words, Your Order</h2>
          <p>
            At the heart of ScriptVocab is the simplicity of sorting your
            personal dictionary by occurrence. This straightforward approach
            allows you to see which words appear most frequently, helping you
            focus on what's important as you dive into a new language.
          </p>
        </section>

        <section className="languageGateway">
          <h2>Your Favorite Texts, Your Language Gateway</h2>
          <p>
            Whether it's a captivating movie, an engaging TV series, or an
            enthralling book, ScriptVocab lets you turn any text into a stepping
            stone for language mastery. Simply upload the text, and watch as
            your personalized dictionary comes to life.
          </p>
        </section>

        <section className="startAdventure">
          <h2>Begin Your Language Learning Adventure Today</h2>
          <p>
            Ready to get started? Create your free account today, and begin
            building your personalized dictionary in seconds or try out our
            demo!
          </p>
          <TranslationView />
        </section>

        <section className="supportSection">
          <h2>We're Here to Support Your Language Learning</h2>
          <p>
            Got questions or need assistance? Our dedicated support team is here
            to ensure your language learning journey with ScriptVocab is smooth
            and enjoyable. Reach out to me on linkedin at &nbsp;
            <a href="https://www.linkedin.com/in/piotrszkafel/">
              www.linkedin.com/in/piotrszkafel
            </a>
            .
          </p>
        </section>
      </StyledCard>
    </Stack>
  );
};
